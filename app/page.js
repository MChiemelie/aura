import { Greeting } from "@/components/greeting";

export default function Home() {
  const paid = false;

  async function signOut() {
    "use server";
    // Sign out logic here
  }

  async function initializePayment() {
    "use server";
    // Initialize payment logic here
  }

  return (
    <main className='flex flex-col sm:flex-row items-center p-4 justify-between gap-4 mx-auto sm:mx-0'>
      <Greeting />
      <div className='flex gap-4'>
        <form action={signOut}>
          <button type='submit' className='p-2 rounded text-sm'>
            Sign out
          </button>
        </form>
        {paid || (
          <form action={initializePayment}>
            <button type='submit' className='p-2 border rounded text-sm'>
              Get Premium
            </button>
          </form>
        )}
      </div>
      {/* <WeatherDashboard /> */}
    </main>
  );
}
