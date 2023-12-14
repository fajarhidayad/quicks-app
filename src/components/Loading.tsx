import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="animate-spin">
      <Loader2 size={50} />
    </div>
  );
}
