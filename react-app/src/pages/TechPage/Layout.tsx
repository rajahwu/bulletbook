interface TechPageLayoutProps {
    children: React.ReactNode;
  }
  
const Layout: React.FC<TechPageLayoutProps> = ({ children }) => {
    return (
        <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 flex flex-col">
            { children }
        </div>
    )
}

export default Layout