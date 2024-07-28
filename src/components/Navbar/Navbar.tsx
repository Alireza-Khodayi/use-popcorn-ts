interface IProps {
  children: React.ReactNode;
}
function Navbar({ children }: IProps) {
  return <nav className='nav-bar'>{children}</nav>;
}
export { Navbar };
