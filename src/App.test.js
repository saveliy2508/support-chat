import { render, screen } from '@testing-library/react';
// import App from './App';
import AuthorizationForm from "./components/Authorization/SignUpPage/SignUpPage";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('render auth form', () => {
  const {myComponent} = render(<AuthorizationForm />);
})