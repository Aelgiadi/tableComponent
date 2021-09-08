// @flow

import type { TMultiselectFilter } from '/filter-chips';
import {
  useCaregiverAdmins,
  useCaregiverClasses,
  useCaregivers,
  useClientAdmins,
  useClientClasses,
  useClients,
  usePayers,
  useRegions,
  useServices,
} from '/api';

export function useClientsFilter(): TMultiselectFilter {
  const clients = useClients();
  return {
    id: 'clientIds',
    type: 'multiselect',
    label: 'Client',
    group: 'Clients',
    options: Object.keys(clients).map(id => ({
      label: clients[id].name,
      value: id,
    })),
  };
}

export function useClientClassesFilter(): TMultiselectFilter {
  const classes = useClientClasses();
  return {
    id: 'clientClasses',
    type: 'multiselect',
    label: 'Client Class',
    group: 'Clients',
    options: Object.keys(classes).map(c => ({
      label: classes[c],
      value: c,
    })),
  };
}

export function useClientRegionsFilter(): TMultiselectFilter {
  const regions = useRegions();
  return {
    id: 'clientRegionIds',
    type: 'multiselect',
    label: 'Client Region',
    group: 'Clients',
    options: Object.keys(regions).map(code => ({
      label: regions[Number.parseInt(code)].name,
      value: code,
    })),
  };
}

export function useClientAdminsFilter(): TMultiselectFilter {
  const admins = useClientAdmins();
  return {
    id: 'clientAdminIds',
    type: 'multiselect',
    label: 'Client Admin',
    group: 'Clients',
    options: admins.map(admin => ({
      label: admin.name,
      value: admin.id.toString(),
    })),
  };
}

export function useCaregiversFilter(): TMultiselectFilter {
  const caregivers = useCaregivers();
  return {
    id: 'caregiverIds',
    type: 'multiselect',
    label: 'Caregiver',
    group: 'Caregivers',
    options: Object.keys(caregivers).map(id => ({
      label: caregivers[id].name,
      value: id,
    })),
  };
}

export function useCaregiverClassesFilter(): TMultiselectFilter {
  const classes = useCaregiverClasses();
  return {
    id: 'caregiverClasses',
    type: 'multiselect',
    label: 'Caregiver Class',
    group: 'Caregivers',
    options: Object.keys(classes).map(c => ({
      label: classes[c],
      value: c,
    })),
  };
}

export function useCaregiverRegionsFilter(): TMultiselectFilter {
  const regions = useRegions();
  return {
    id: 'caregiverRegionIds',
    type: 'multiselect',
    label: 'Caregiver Region',
    group: 'Caregivers',
    options: Object.keys(regions).map(code => ({
      label: regions[Number.parseInt(code)].name,
      value: code,
    })),
  };
}

export function useCaregiverAdminsFilter(): TMultiselectFilter {
  const admins = useCaregiverAdmins();
  return {
    id: 'caregiverAdminIds',
    type: 'multiselect',
    label: 'Caregiver Admin',
    group: 'Caregivers',
    options: admins.map(admin => ({
      label: admin.name,
      value: admin.id.toString(),
    })),
  };
}

export function usePayersFilter(): TMultiselectFilter {
  const payers = usePayers();
  return {
    id: 'payerIds',
    type: 'multiselect',
    label: 'Payer',
    group: 'Payers',
    options: Object.keys(payers).map(p => ({
      value: p,
      label: payers[p].name,
    })),
  };
}

export function useServicesFilter(): TMultiselectFilter {
  const services = useServices();
  return {
    id: 'serviceIds',
    type: 'multiselect',
    label: 'Service',
    group: 'Services',
    options: Object.keys(services).map(s => {
      return {
        value: s,
        label: services[parseInt(s)].description,
      };
    }),
  };
}
