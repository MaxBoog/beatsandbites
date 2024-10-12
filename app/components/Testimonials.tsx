import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function Testimonials() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-neutral-900  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Beats & Bites has completely revolutionized my cooking experience! The recipes are fantastic, and the matching playlists make meal prep so much more enjoyable.",
    name: "Alexandra Williams",
    title: "Food Enthusiast",
  },
  {
    quote:
      "I love how Beats & Bites tailors both the meal and the music to my mood. It's like having a personal chef and DJ all in one app!",
    name: "Benjamin Lee",
    title: "Home Cook",
  },
  {
    quote:
      "This app is a game-changer. The curated playlists perfectly complement the recipes, turning dinner into a delightful experience every time.",
    name: "Sophia Chen",
    title: "Lifestyle Blogger",
  },
  {
    quote:
      "Cooking used to feel like a chore, but with Beats & Bites, it's become the highlight of my day. The music keeps me energized while I whip up delicious meals.",
    name: "Michael Thompson",
    title: "College Student",
  },
  {
    quote:
      "As a professional chef, I'm impressed by the quality of recipes and the innovative concept of pairing them with music. Beats & Bites brings joy back into the kitchen!",
    name: "Isabella Garcia",
    title: "Professional Chef",
  },
];
