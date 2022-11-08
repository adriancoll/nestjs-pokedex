export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
//   post<T, dto>(url: string, body: dto): Promise<T>;
//   patch<T, dto>(url: string, body: dto): Promise<T>;
//   delete<T>(url: string): Promise<T>;
}
