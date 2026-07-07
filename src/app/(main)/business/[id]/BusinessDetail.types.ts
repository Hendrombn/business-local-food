// export interface BusinessDetailPageProps {
//   params: {
//     id: string;
//   };
// }

export interface BusinessDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}
