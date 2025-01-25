

export default function page (props= ''){
  return (
    <section className={`${props.class} flex flex-col justify-center w-1/2`}>
      {props.children}
    </section>
  )
}