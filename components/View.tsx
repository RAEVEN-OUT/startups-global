"use client";

import { useEffect, useState } from "react";
import Ping from "@/components/ping";

const View = ({ id }: { id: string }) => {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const res = await fetch(`/api/views/${id}`);
        const data = await res.json();
        setViews(data.views);
      } catch (err) {
        console.error("Failed to increment views:", err);
      }
    };

    incrementViews();
  }, [id]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {views}</span>
      </p>
    </div>
  );
};

export default View;
