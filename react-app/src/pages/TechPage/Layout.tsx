interface TechPageLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<TechPageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:grid lg:grid-rows-3 lg:grid-cols-3">
      {children}
    </div>
  );
};

export default Layout;
