import { Container } from '@/components/common';
import styles from './About.module.scss';

export function About() {
  return (
    <section className={styles.section} id="about">
      <Container>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <h2 className={styles.title}>Sobre KINETIA</h2>
            <p className={styles.description}>
              KINETIA es una compañía de ingeniería y consultoría especializada en automatización inteligente, inteligencia artificial y desarrollo de software a medida. Nuestro equipo multidisciplinario de ingenieros, científicos de datos, diseñadores y estrategas de negocio comparte una misma visión: transformar la manera en que las organizaciones operan y toman decisiones, generando impacto medible en la eficiencia y el crecimiento.
            </p>
            <p className={styles.description}>
              Entendemos que la tecnología por sí sola no garantiza el éxito; las empresas que priorizan una cultura inclusiva y colaborativa ven un aumento del 30 % en la productividad y del 40 % en la retención de talento. Por ello, en KINETIA invertimos en el desarrollo de nuestro talento y en la construcción de una cultura digital sólida: promovemos una mentalidad de aprendizaje continuo y el liderazgo ejemplar, ya que las transformaciones tienen 5,3 veces más probabilidades de éxito cuando los líderes modelan los comportamientos que esperan de sus equipos. Además, sabemos que la adopción tecnológica depende de factores humanos y culturales, por lo que situamos a las personas en el centro de cada proyecto.
            </p>
          </div>

          <div className={styles.rightColumn}>
            <h3 className={styles.valuesTitle}>Nuestros valores</h3>

            <div className={styles.values}>
              <div className={styles.valueItem}>
                <h4>Innovación</h4>
                <p>Fomentamos equipos multidisciplinarios, recompensamos la creatividad y desaprendemos prácticas obsoletas, porque una cultura de innovación acelera la transformación organizacional. Nos mantenemos a la vanguardia tecnológica, explorando modelos de negocio emergentes y aplicando IA y automatización para crear valor diferencial.</p>
              </div>
              <div className={styles.valueItem}>
                <h4>Compromiso</h4>
                <p>Construimos un entorno inclusivo y colaborativo que incrementa la productividad y la retención de talento. Creemos en el liderazgo coherente: nuestros directivos practican los valores que promueven, facilitando así la adopción de nuevas tecnologías y el cambio cultural. El éxito de nuestros clientes es nuestro propio éxito, y trabajamos de la mano para alcanzar objetivos comunes.</p>
              </div>
              <div className={styles.valueItem}>
                <h4>Agilidad</h4>
                <p>Adoptamos metodologías ágiles, basadas en entregas incrementales y feedback continuo, que permiten adaptarnos rápidamente a los cambios y entregar valor de manera iterativa. Esta flexibilidad nos ayuda a innovar con rapidez y a escalar soluciones eficientes y sostenibles, manteniendo a nuestros clientes competitivos en mercados dinámicos.</p>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.closing}>
          En KINETIA, no solo implementamos soluciones tecnológicas; impulsamos la cultura, el talento y la estrategia que permiten a las organizaciones prosperar en la era de la automatización y la inteligencia artificial. Nuestro compromiso es acompañar a nuestros clientes en su camino hacia la excelencia, combinando conocimiento técnico de vanguardia con una profunda comprensión de la gestión del cambio y el liderazgo.
        </p>
      </Container>
    </section>
  );
}
