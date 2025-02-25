/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Trash2, Plus, Pencil, MoreVertical, Layers } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const HiringStages = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [hiringStages, setHiringStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessToken = session?.access_token;
  const orgId = session?.organizationId;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingStage, setEditingStage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingStage) {
      setValue("title", editingStage.title);
      setValue("order", editingStage.order);
      setValue("description", editingStage.description);
    }
  }, [editingStage, setValue]);

  const fetchHiringStages = async () => {
    if (!orgId || !accessToken) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages?where[organization.id][equals]=${orgId}`,
        // `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Hiring Stage Data :: ", data);
      setHiringStages(data.docs || []);
    } catch (error) {
      if (data.doc.length === 0) {
        console.error("No Hiring Stage found:", error);
        toast({
          title: "Error!",
          description: "No hiring stage for this organization",
          variant: "ourDestructive",
        });
      }
      console.error("Error fetching hiring stages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch hiring stages",
        variant: "ourDestructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHiringStages();
  }, [orgId, accessToken]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const url = editingStage
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages/${editingStage.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages`;

      const method = editingStage ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...data,
          organization: orgId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (editingStage) {
        setHiringStages((prev) =>
          prev.map((stage) =>
            stage.id === editingStage.id ? responseData : stage
          )
        );
      } else {
        setHiringStages((prev) => [...prev, responseData]);
      }

      toast({
        title: "Success!",
        description: `Hiring stage ${
          editingStage ? "updated" : "added"
        } successfully`,
        variant: "ourSuccess",
      });

      setIsDialogOpen(false);
      reset();
      setEditingStage(null);
    } catch (error) {
      console.error("Error saving hiring stage:", error);
      toast({
        title: "Failed!",
        description: `Error ${
          editingStage ? "updating" : "adding"
        } hiring stage.`,
        variant: "ourDestructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setHiringStages((prev) => prev.filter((stage) => stage.id !== id));
      toast({
        title: "Success",
        description: "Hiring stage deleted successfully",
        variant: "ourSuccess",
      });
    } catch (error) {
      console.error("Error deleting hiring stage:", error);
      toast({
        title: "Failed!",
        description: "Error deleting hiring stage.",
        variant: "ourDestructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (stage) => {
    setEditingStage(stage);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading hiring stages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0 p-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-2">
                {/* <Layers className="h-8 w-8 text-primary" /> */}
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  Hiring Stages
                </CardTitle>
              </div>
              <CardDescription className="text-muted-foreground mt-2">
                Configure and manage your recruitment pipeline stages
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="md"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="h-4 w-4" /> Add Hiring Stage
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    {editingStage
                      ? "Edit Hiring Stage"
                      : "Add New Hiring Stage"}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-2">
                    {editingStage
                      ? "Modify the existing hiring stage details"
                      : "Create a new stage in your hiring pipeline"}
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 mt-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Stage Title</label>
                    <Input
                      {...register("title", { required: "Title is required" })}
                      placeholder="e.g., Initial Screening"
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Order</label>
                    <Input
                      {...register("order", {
                        required: "Order is required",
                        valueAsNumber: true,
                      })}
                      type="number"
                      placeholder="e.g., 1"
                    />
                    {errors.order && (
                      <p className="text-sm text-destructive">
                        {errors.order.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      {...register("description")}
                      placeholder="Describe the purpose of this stage..."
                      className="min-h-[100px]"
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        setEditingStage(null);
                        reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {editingStage ? "Update Stage" : "Create Stage"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="px-0">
          <AnimatePresence mode="wait">
            {hiringStages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2 border-dashed border-muted">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">
                      No hiring stages found
                    </p>
                    <p className="text-sm text-muted-foreground/60 text-center mt-1">
                      Click the &apos;Add Hiring Stage&apos; button to create
                      your first stage
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 py-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">
                    Title
                  </div>
                  <div className="text-sm font-medium text-muted-foreground hidden md:block">
                    Order
                  </div>
                  <div className="text-sm font-medium text-muted-foreground hidden md:block">
                    Description
                  </div>
                  <div className="text-sm font-medium text-muted-foreground md:text-left text-center items-center mx-auto">
                    Actions
                  </div>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {hiringStages.map((stage) => (
                      <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="hover:shadow-md transition-all duration-200">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="flex items-center">
                                <div>
                                  <p className="font-medium text-foreground">
                                    {stage.title}
                                  </p>
                                  <Badge
                                    variant="secondary"
                                    className="mt-1 md:hidden"
                                  >
                                    Order: {stage.order}
                                  </Badge>
                                </div>
                              </div>
                              <div className="hidden md:flex items-center">
                                <Badge variant="secondary">{stage.order}</Badge>
                              </div>
                              <div className="hidden md:block text-muted-foreground truncate text-[14px]">
                                {stage.description}
                              </div>
                              <div className="flex justify-end md:justify-center items-center gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-muted"
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                  >
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => handleEdit(stage)}
                                      className="flex items-center cursor-pointer"
                                    >
                                      <Pencil className="h-4 w-4 mr-2" /> Edit
                                      Stage
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="flex items-center text-destructive focus:text-destructive cursor-pointer"
                                      onClick={() => handleDelete(stage.id)}
                                      disabled={isDeleting}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                                      Stage
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <div className="md:hidden mt-2">
                              <p className="text-[15px] text-muted-foreground">
                                {stage.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default HiringStages;
