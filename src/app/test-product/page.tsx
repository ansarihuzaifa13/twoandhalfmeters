import { supabase } from "@/lib/supabase"

export default async function TestProductPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(10)

  if (error) {
    return (
      <div className="p-10">
        <h1 className="text-2xl text-red-600">
          Supabase Error
        </h1>

        <pre className="mt-5">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl">
        Supabase Products Test
      </h1>

      <pre className="mt-5 whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}