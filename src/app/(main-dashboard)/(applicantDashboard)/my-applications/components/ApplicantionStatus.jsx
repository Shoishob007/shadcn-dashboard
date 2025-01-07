import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StatusDetails from "./StatusDetails";

const ApplicantionStatus = ({ viewStatus }) => {
  return (
    <>
      <Dialog className=''>
        <DialogTrigger>
          <Button >View Status</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Application Status Update</DialogTitle>
            <DialogDescription className="text-xs mt-10 dark:text-gray-400">
              Thank you for applying! We&apos;ll notify you of any updates. For
              any questions, contact dev.hirehub@domain.com.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <StatusDetails />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicantionStatus;
