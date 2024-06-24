import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores/alert.js';

export const useAlert = () => {
  const { alerts } = storeToRefs(useAlertStore());
  const { vAlert, vSuccess } = useAlertStore();
  return {
    alerts,
    vAlert,
    vSuccess,
  };
};
