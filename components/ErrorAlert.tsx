type ErrorProps = {
  message?: string;
  callBack: () => void;
};

const ErrorAlert = ({ message, callBack }: ErrorProps) => {
  return (
    <div className="mx-auto prose text-center">
      <h1>Uh oh!</h1>
      <p>{message ?? "Sorry an error occured please try again"}</p>
      <button className="btn btn-primary" onClick={callBack}>
        try again
      </button>
    </div>
  );
};

export default ErrorAlert;
