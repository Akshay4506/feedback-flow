import { useEffect, useState } from "react";
import { Star, Calendar, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string | null;
  status: string;
  created_at: string;
}

export default function FeedbackList() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setFeedback(data || []);
    } catch (error: any) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to load feedback", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-32" />
          </Card>
        ))}
      </div>
    );
  }

  if (feedback.length === 0) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground text-lg">No feedback submitted yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Be the first to share your thoughts!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            All Feedback ({feedback.length})
          </CardTitle>
        </CardHeader>
      </Card>

      {feedback.map((item) => (
        <Card key={item.id} className="shadow-elegant hover:shadow-glow transition-all duration-300">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Header with name and rating */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{item.email}</span>
                  </div>
                </div>
                <Badge variant={item.status === "new" ? "default" : "secondary"}>
                  {item.status}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= item.rating
                        ? "fill-primary text-primary"
                        : "fill-none text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{item.rating}/5</span>
              </div>

              {/* Message */}
              {item.message && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm leading-relaxed">{item.message}</p>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(item.created_at)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
