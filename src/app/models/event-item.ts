// pas "Event" pour ne pas confondre avec le type Event du DOM
export interface EventItem {
  id: number;
  title: string;
  category: string;
  date: string;
  place: string;
  price: number; // 0 = gratuit
  imageUrl: string;
  description: string;
}
