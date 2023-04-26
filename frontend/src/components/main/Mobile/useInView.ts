// useInView.ts
import { useCallback, useState, useRef } from 'react';

export default function useInView(threshold: number): [React.RefCallback<HTMLElement>, boolean] {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<IntersectionObserver | null>(null);

    const setRef = useCallback((node: HTMLElement | null) => {
        if (ref.current) {
            ref.current.disconnect();
        }

        if (node) {
            ref.current = new IntersectionObserver(
                ([entry]) => {
                    setIsInView(entry.isIntersecting);
                },
                {
                    threshold,
                },
            );

            if (ref.current) {
                ref.current.observe(node);
            }
        }
    }, []);

    return [setRef, isInView];
}
