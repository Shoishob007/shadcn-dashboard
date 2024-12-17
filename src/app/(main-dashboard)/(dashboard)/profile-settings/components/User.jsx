import React, { useState } from "react";
import { dummyUsers } from "./userManagementData";
import { Pencil, PlusCircle, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function UserManagement() {
  const [users, setUsers] = useState(dummyUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    designation: "",
    access: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (newUser.id && newUser.name && newUser.designation && newUser.access) {
      setUsers([...users, newUser]);
      setNewUser({ id: "", name: "", designation: "", access: "" });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="p-6 ">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-400">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200 text-center py-4 border-b border-gray-200">
          User Management Table
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="">
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 uppercase text-xs leading-normal">
                <th className="py-3 px-4 text-center font-medium">
                  Employee ID
                </th>
                <th className="py-3 px-4 text-center font-medium">Name</th>
                <th className="py-3 px-4 text-center font-medium">
                  Designation
                </th>
                <th className="py-3 px-4 text-center font-medium">Access</th>
                <th className="py-3 px-4 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={` ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-700"
                      : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <td className="py-3 px-4 text-center border-b">
                    {user.E_id}
                  </td>
                  <td className="py-3 px-4 text-center border-b">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-center border-b">
                    {user.designation}
                  </td>
                  <td className="py-3 px-4 text-center border-b">
                    {user.access}
                  </td>
                  <td className="py-3 px-4 text-center border-b flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      className="p-2 rounded hover:bg-gray-200 transition duration-200"
                      onClick={() => handleEditClick(user)}
                    >
                      <Pencil className="w-4 md:w-5 h-4 md:h-5 hover:!text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="p-2 rounded transition duration-200"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <TrashIcon className="w-4 md:w-5 h-4 md:h-5 hover:!text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add User Button */}
        <div className="flex justify-end p-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-xs"
              >
                <PlusCircle className="w-4 h-4 md:w-5 md:h-5" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Add New User
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Employee ID */}
                <div>
                  <Label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    Employee ID
                  </Label>
                  <Input
                    id="id"
                    placeholder="Enter employee ID"
                    name="id"
                    value={newUser.id}
                    onChange={handleInputChange}
                    className="dark:border dark:border-gray-400 mt-1"
                  />
                </div>

                {/* Employee Name */}
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    Employee Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter employee name"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    className="dark:border dark:border-gray-400 mt-1"
                  />
                </div>

                {/* Designation */}
                <div>
                  <Label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    Designation
                  </Label>
                  <Input
                    id="designation"
                    placeholder="Enter designation"
                    name="designation"
                    value={newUser.designation}
                    onChange={handleInputChange}
                    className="dark:border dark:border-gray-400 mt-1"
                  />
                </div>

                {/* Access Level */}
                <div>
                  <Label
                    htmlFor="access"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    Access Level
                  </Label>
                  <Select
                    value={newUser.access || ""}
                    onValueChange={(value) =>
                      setNewUser((prev) => ({ ...prev, access: value }))
                    }
                  >
                    <SelectTrigger
                      id="access"
                      className="w-full dark:border dark:border-gray-400 mt-1"
                    >
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="text-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddUser}
                  className="bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  Add User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit User Dialog */}
        {editingUser && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-md p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Edit User
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
              <div>
                  <Label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    Employee ID
                  </Label>
                  <Input
                    id="id"
                    placeholder="Enter employee id"
                    name="id"
                    value={editingUser.E_id}
                    onChange={handleEditChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    Employee Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter employee name"
                    name="name"
                    value={editingUser.name}
                    onChange={handleEditChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    Designation
                  </Label>
                  <Input
                    id="designation"
                    placeholder="Enter designation"
                    name="designation"
                    value={editingUser.designation}
                    onChange={handleEditChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="access"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    Access Level
                  </Label>
                  <Select
                    value={editingUser.access || ""}
                    onValueChange={(value) =>
                      setEditingUser((prev) => ({ ...prev, access: value }))
                    }
                  >
                    <SelectTrigger id="access" className="w-full mt-1">
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="text-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditUser}
                  className="bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
