import { CalculatorRouteName, CalculatorRoutePath, ItemsRouteName, ItemsRoutePath, SimulatorRouteName, SimulatorRoutePath } from 'src/enums/route';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: SimulatorRoutePath.PenetrationChance,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: SimulatorRouteName.PenetrationChance,
        component: () => import('pages/simulator/PenetrationChance.vue')
      }
    ]
  },

  {
    path: SimulatorRoutePath.Damage,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: SimulatorRouteName.Damage,
        component: () => import('pages/simulator/Damage.vue')
      }
    ]
  },

  {
    path: CalculatorRoutePath.CurrencyConvert,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: CalculatorRouteName.CurrencyConvert,
        component: () => import('pages/calculator/CurrencyConverter.vue')
      }
    ]
  },

  {
    path: CalculatorRoutePath.MarketFeeCalculator,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: CalculatorRouteName.MarketFeeCalculator,
        component: () => import('pages/calculator/MarketFee.vue')
      }
    ]
  },

  {
    path: ItemsRoutePath.Items,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: ItemsRouteName.Items,
        component: () => import('pages/items/Items.vue'),
      },
      {
        path: ItemsRoutePath.Kind,
        name: ItemsRouteName.Kind,
        component: () => import('pages/items/Kind.vue'),
      },
      {
        path: ItemsRoutePath.Details,
        name: ItemsRouteName.Details,
        component: () => import('pages/items/Details.vue'),
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
