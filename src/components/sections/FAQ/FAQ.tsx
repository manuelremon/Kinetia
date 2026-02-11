'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/common';
import FAQ_ITEMS from '@/data/faq.json';
import styles from './FAQ.module.scss';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className={styles.faq}>
      <Container>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Preguntas Frecuentes</h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              className={`${styles.item} ${openIndex === index ? styles.open : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                className={styles.questionBtn}
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
              >
                <div>
                  <span className={styles.category}>{item.category}</span>
                  <span className={styles.question}>{item.question}</span>
                </div>
                <span className={styles.icon}>+</span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className={styles.answerWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className={styles.answer}>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

      </Container>
    </section>
  );
}
