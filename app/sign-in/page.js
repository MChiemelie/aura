

export default async function SignInPage() {
  async function signInWithEmail(formData) {
    "use server";
    //
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <form action={signInWithEmail} className='flex flex-col gap-4 w-[40%]'>
        <h1 className='text-4xl font-extrabold text-center'>Login</h1>
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
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded'
        >
          Sign In
        </button>
        <p className='text-center text-gray-600'>
          Don't have an account?{" "}
          <a href='/sign-up' className='text-blue-500 hover:underline'>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
