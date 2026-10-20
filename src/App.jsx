import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Work from './components/Work.jsx';
import Menu from './components/Menu.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Menu />
        <Contact />
      </main>
    </>
  );
}
