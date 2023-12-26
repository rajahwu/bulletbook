interface TechViewPageLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<TechViewPageLayoutProps> = ({ children }) => {
  return (
      <div className="flex">
          { children }
      </div>
  )
}

export default Layout