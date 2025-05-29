"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";

export default function Review({ _id }) {
  const [feedback, setfeedback] = useState("");
  const [rating, setrating] = useState(null);

  async function handleSubmitFeedback(_id) {
    const response = await axios.post(
      `http://localhost:3000/api/dashboard/my-parcel/review/${_id}`,
      {
        feedback: feedback,
        rating: rating,
      }
    );
    const data = response.data;
    console.log(data);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Review</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Feedback</DialogTitle>
            <DialogDescription>
              <input
                onChange={(e) => setfeedback(e.target.value)}
                type="text"
                className="border border-black"
              />
              <input
                onChange={(e) => setrating(e.target.value)}
                type="text"
                className="border border-black"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose>
              <Button type="button" variant="secondary">
                Close
              </Button>
              <Button
                onClick={() => handleSubmitFeedback(_id)}
                className="ml-2"
              >
                Submit your feedback
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
