import { useForm, ValidationError } from '@formspree/react';
import './SubscribeForm.css';

const SubscribeForm = () => {
  const [state, handleSubmit] = useForm("xpqqangq");

  if (state.succeeded) {
    return <div className="subscribe-success">Thanks! You're on the list.</div>;
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        className="subscribe-input"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <button type="submit" className="subscribe-button" disabled={state.submitting}>
        {state.submitting ? 'Joined' : 'Subscribe'}
      </button>
    </form>
  );
};

export default SubscribeForm;
