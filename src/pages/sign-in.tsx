import { type GetServerSidePropsContext } from "next";
import Pomodoro from "public/images/bowling-ball.svg";
import { signIn, getProviders } from "next-auth/react";

import { type Provider } from "next-auth/providers";

interface Props {
  providers: Provider[];
}

const SignIn = ({ providers }: Props) => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <section className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cGray-200">
            <img className="w-10" src={Pomodoro.src} alt="Pomodoro" />
          </div>
          <div className="mt-7 flex flex-col items-center">
            <h1 className="text-3xl font-bold">Pomodoro</h1>
            <p className="text-md mt-1">A better way to focus.</p>
          </div>
        </section>
        <section className="mt-10 flex w-48 flex-col items-center">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: "/",
                  })
                }
                className="btn--outlined w-full"
              >
                Continue with {provider.name}
              </button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default SignIn;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};
