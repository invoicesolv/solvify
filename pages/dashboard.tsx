import { sql } from '../backend/src/db';

interface DashboardProps {
  data: any; // Replace 'any' with a more specific type if possible
}

export default function Dashboard({ data }: DashboardProps) {
  // Your component logic here
}

export const config = {
  runtime: 'experimental-edge',
};

export async function getServerSideProps() {
  const data = await sql`SELECT * FROM your_table`;
  return { props: { data } };
}