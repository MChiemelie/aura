import { signUpWithEmail } from "@/services/auth";
import Link from "next/link";

export default async function SignUpPage() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <form action={signUpWithEmail} className='flex flex-col gap-4 w-[40%]'>
        <h1 className='text-4xl font-extrabold text-center'>Create Account</h1>
        <input
          id='email'
          name='email'
          placeholder='exmaple@email.com'
          type='email'
          className='border rounded p-4'
        />
        <input
          id='password'
          name='password'
          placeholder='Password'
          minLength={8}
          type='password'
          className='border rounded p-4'
        />
        <input
          id='name'
          name='name'
          placeholder='John Doe'
          type='text'
          className='border rounded p-4'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded'
        >
          Sign up
        </button>
        <p className='text-center text-gray-600'>
          Already have an account?{" "}
          <Link href='/sign-in' className='text-blue-500 hover:underline'>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
