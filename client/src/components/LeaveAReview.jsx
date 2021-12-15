import React, { useState, useContext } from "react";
import { Button, Container, Card, CardHeader, Paper, TextField } from "@material-ui/core";
import { Rating } from '@mui/material';
import { Navigate } from "react-router-dom";
import AppContext from '../hooks/context';
import { postReview } from "../utils";

export default function LeaveAReview() {
  const { reviewJob, user } = useContext(AppContext);
  const [reviewBody, setReviewBody] = useState('');
  const [rating, setRating] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmitReview = () => {
    if (!rating || reviewBody === '') {
      return alert('Please Submit a Review');
    }

    const reviewData = {
      jobId: reviewJob.task_id,
      clientId: user.id,
      contractorId: reviewJob.contractor.id,
      reviewRating: rating,
      reviewBody: reviewBody,
      date: new Date(),
      contractorRating: reviewJob.contractor.rating,
      contractorJobs: reviewJob.contractor.jobsCompleted
    }

    postReview(reviewData)
      .then(res => { setReviewSubmitted(true); alert('Thanks for Writing a Review!'); })
      .catch(err => alert('There was a problem submitting your review. Please try again?'));
  }

  if (reviewSubmitted) {
    return (<Navigate to="/main"/>)
  }

  return (
    <Container>
      <Card className="job-review-container" style={{ padding: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div>
            <div><strong>{reviewJob.title}</strong></div>
            <div>${reviewJob.price_per_hour}/hr</div>
          </div>
          <div>{reviewJob.date}</div>
        </div>
        <div>Job Description:</div>
        <div>{reviewJob.description}</div>
        <ul>Specialties Required: {reviewJob.specialties?.map(specialty => <li key={specialty}>{specialty}</li>)}</ul>
      </Card>
      <div>Completed By:{' '}{reviewJob.contractor.firstname}{' '}{reviewJob.contractor.lastname}</div>
      <div>
        <TextField
          id="addReviewBody"
          name="addReviewBody"
          label="Write Your Review"
          value={reviewBody}
          variant="filled"
          onChange={(e) => {
            setReviewBody(e.target.value);
          }}
        />
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(e, newRating) => {
            setRating(newRating);
          }}
        />
      </div>
      <Button onClick={handleSubmitReview}>Submit Review</Button>
    </Container>
  )
};