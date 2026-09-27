import Nav from './components/Nav.jsx';
import Label from './components/Label.jsx';
import TastingNotes from './components/TastingNotes.jsx';
import Shelf from './components/Shelf.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Label />
        <hr className="tear" />
        <TastingNotes />
        <hr className="tear" />
        <Shelf />
      </main>
      <hr className="tear" />
      <Footer />
    </>
  );
}
