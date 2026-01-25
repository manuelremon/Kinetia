import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common';
import { TESTIMONIALS } from '@/utils/constants';
import styles from './Testimonials.module.scss';

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = trackRef.current.offsetWidth * 0.8;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`${styles.star} ${i >= rating ? styles.starEmpty : ''}`}
      >
        ★
      </span>
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section id="testimonials" className={styles.testimonials}>
      <Container>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Testimonios</h2>
        </motion.div>
      </Container>

      <motion.div
        className={styles.carousel}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div ref={trackRef} className={styles.track}>
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className={styles.quote}>"</span>
              <div className={styles.rating}>
                {renderStars(testimonial.rating)}
              </div>
              <p className={styles.text}>{testimonial.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.avatar ? (
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  ) : (
                    getInitials(testimonial.name)
                  )}
                </div>
                <div className={styles.info}>
                  <span className={styles.name}>{testimonial.name}</span>
                  <span className={styles.role}>{testimonial.role}</span>
                  <span className={styles.company}>{testimonial.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={() => scroll('left')}
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            className={styles.navButton}
            onClick={() => scroll('right')}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </motion.div>
    </section>
  );
}
