import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackList, setFeedbackList] = useState<any[]>([]);

  const submitFeedback = async () => {
    const { error } = await supabase
      .from("feedback")
       .insert([{ name, email, rating: parseInt(rating), message }]);

    if (error) console.error(error);
    else {
      alert("Feedback saved!");
      getFeedback();
    }
  };

  const getFeedback = async () => {
    const { data } = await supabase
      .from("feedback")
      .select("*")
      .order("submittedAt", { ascending: false });
    if (data) setFeedbackList(data);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Feedback Form</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/><br/>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
      <input placeholder="Rating (1-5)" type="number" onChange={(e) => setRating(e.target.value)} /><br/><br/>
      <textarea placeholder="Message" onChange={(e) => setMessage(e.target.value)} /><br/><br/>

      <button onClick={submitFeedback}>Submit</button>

      <h3>Feedback List</h3>
      {feedbackList.map((item, index) => (
        <div key={index} style={{ border: "1px solid #aaa", padding: "10px", marginTop: "10px" }}>
          <strong>{item.name}</strong> – {item.rating}/5 <br />
          {item.email}<br />
          {item.message}<br />
          <small>{new Date(item.submittedAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
