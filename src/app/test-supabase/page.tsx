import { supabase } from "@/lib/supabase"

export default async function TestSupabasePage() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(1)

  return (
    <main className="min-h-screen p-10">
      <h1 className="mb-6 text-3xl font-serif">
        Supabase Connection Test
      </h1>

      {error ? (
        <div>
          <h2 className="font-bold text-red-600">
            Connection Failed
          </h2>

          <pre className="mt-4 whitespace-pre-wrap">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-green-600">
            Supabase Connected Successfully
          </h2>

          <pre className="mt-4 whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </main>
  )
}