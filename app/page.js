import { Greeting } from "@/components/greeting";
import { signOut } from "@/services/auth";
import { initializePayment } from "@/services/payments";

export default function Home() {
  const paid = false;

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
