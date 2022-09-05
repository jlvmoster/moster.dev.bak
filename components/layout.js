import Footer from './footer';

const Layout = ({ children }) => (
  <div className='absolute w-full h-full flex flex-col'>
    <main className='flex-grow'>{children}</main>
    <Footer />
  </div>
);

export default Layout;
