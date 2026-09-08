'use client';

import { api } from '@/services/api';

import type { Client } from '@/features/clients/types/client';

const clientsCache = new Map<string, Client[]>();
const clientsInFlight = new Map<string, Promise<Client[]>>();

export async function getClients(
  companyId: string,
): Promise<Client[]> {
  const cachedClients = clientsCache.get(companyId);

  if (cachedClients) {
    return cachedClients;
  }

  const inFlightRequest = clientsInFlight.get(companyId);

  if (inFlightRequest) {
    return inFlightRequest;
  }

  const request = api
    .get(`/clients/${companyId}`)
    .then((response) => {
      const responseClients = response.data.clients ?? [];

      clientsCache.set(
        companyId,
        responseClients,
      );

      return responseClients;
    })
    .finally(() => {
      clientsInFlight.delete(companyId);
    });

  clientsInFlight.set(companyId, request);

  return request;
}

export function updateClientsCache(
  companyId: string,
  clients: Client[],
) {
  clientsCache.set(companyId, clients);
}

export function getClientsFromCache(
  companyId: string,
) {
  return clientsCache.get(companyId);
}