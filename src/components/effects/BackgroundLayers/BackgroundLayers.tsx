import styles from './BackgroundLayers.module.scss';
import { ParticleCanvas } from '../ParticleCanvas';

export function BackgroundLayers() {
  return (
    <>
      <div className={styles.bgLayers}>
        <div className={styles.gradientMesh} />
        <ParticleCanvas />
        <div className={styles.grid} />
        <div className={styles.noise} />
      </div>
    </>
  );
}
