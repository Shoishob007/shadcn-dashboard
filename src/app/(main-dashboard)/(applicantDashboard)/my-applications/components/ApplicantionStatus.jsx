import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ApplicantionStatus = ({viewStatus}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">View Status</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Application Status Update</DialogTitle>
            <DialogDescription className='text-xs mt-10'>
            Thank you for applying! We&apos;ll notify you of any updates. For any questions, contact dev.hirehub@domain.com.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Satus: {viewStatus}</p>
            <p className="mt-4 text-center">[Developer is working on it]</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicantionStatus;
