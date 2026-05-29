export function Greeting({name}) {
  const date = new Date();
  const hour = date.getHours();

  const greeting =
    hour > 0 && hour < 12
      ? "Good morning"
      : hour >= 12 && hour < 18
        ? "Good afternoon"
        : "Good evening";

  return <h1 className='text-2xl font-bold'>{greeting}, {name}!</h1>;
}
