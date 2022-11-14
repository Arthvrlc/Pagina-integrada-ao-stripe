import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const session = useSession();
    const user = session.data?.user;

    async function handleSubscribe() {
        try {
            
            if (!session) {
                signIn('github')
                return;
            }
            console.log('user INFOOOOOOo', user)
            const response = await api.post('/subscribe', {
                user
            });

            const { sessionId } = response.data;
            console.log(response.data)

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({ sessionId });
        } catch (err) {
            alert(err.message);
        }
    }
    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}