import { Greeting } from "@/components/greeting";
import WeatherDashboard from "@/components/weather-dashboard";
import { getUser, signOut } from "@/services/auth";
import { initializePayment } from "@/services/payments";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if (!user) redirect("/sign-in");

  const { name, email, paid } = user;


  return (
    <main className='flex flex-col items-center p-4 justify-between gap-4 mx-auto sm:mx-0'>
      <Greeting name={name} />
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
      <p>You are logged in as ({email})</p>
      <WeatherDashboard />
    </main>
  );
}
