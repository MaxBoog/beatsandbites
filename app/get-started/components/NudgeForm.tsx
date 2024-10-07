"use client";

import { useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";

export default function NudgeForm({ onNudgeSelect }: any) {
  return (
    <>
      <div className="col-span-8">
        <h3 className="mb-4">
          <strong>Nudge Me</strong>
        </h3>
        <p>
          A playlist will be coupled to your recipe to complete your Bite and
          here you can give a nudge in the direction of what kind of music you
          want to go with your recipe.
        </p>
      </div>

      <div className="col-span-12">
        <div className="max-w-7xl mx-auto px-8"></div>
      </div>
    </>
  );
}
