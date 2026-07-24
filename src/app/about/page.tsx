import { Heart } from "lucide-react"
import { story } from "@/lib/site-data"

export default function AboutPage() {
  return (
    <div>
      <section className="container grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
        <div className="flex items-center">
          <div className="max-w-xl">
            <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-primary">{story.eyebrow}</p>
            <div className="h-4 bg-background"></div>
            <h1 className="mt-4 font-serif text-5xl leading-tight text-primary md:text-6xl">{story.title}</h1>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <div className="h-2 bg-background"></div>

              {story.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

            </div>
            <div className="h-8 bg-background"></div>
            <div className="mt-8 grid grid-cols-2 gap-8">
              {story.founders.map((founder) => (
                <div key={founder}>
                  <p className="font-serif text-3xl text-primary">{founder}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Co-founder</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="image-fill min-h-[520px]" style={{ backgroundImage: "url('/images/model-2.jpg')" }} />
      </section>
      <div className="h-10 bg-background"></div>

      <section className=" py-10">
        <div className="container grid gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {story.milestones.map((milestone) => (
            <div
              key={milestone.year}
              className="flex flex-col items-center text-center"
            >
              <Heart className="mb-4 h-5 w-5 text-primary" />

              <div className="h-2 bg-background"></div>
              <p className="font-serif text-2xl leading-none text-primary">
                {milestone.year}
              </p>
              <div className="h-2 bg-background"></div>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {milestone.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
