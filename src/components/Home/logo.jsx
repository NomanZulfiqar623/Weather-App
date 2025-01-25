import logo from '../../assets/logo.png';

export default function Page(props) {
  return (
    <section className={`${props.class} flex justify-center w-1/2`}>
      <img src={logo} alt="Logo not found" className="max-w-full h-auto" />
    </section>
  );
}
