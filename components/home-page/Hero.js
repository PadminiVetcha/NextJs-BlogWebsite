import Image from "next/image";
import classes from "./Hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/AnimatedGirl.jpg" alt="An image showing Padmini" width={300} height={300} />
      </div>
      <h1>Hi, I'm Padmini</h1>
      <p>I blog about Java, Spring Boot, Spring Batch and React JS.</p>
    </section>
  );
}
export default Hero;
