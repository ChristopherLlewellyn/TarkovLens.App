<template>
  <q-dialog
    v-model="props.show"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-toolbar class="bg-primary">
        <q-btn dense flat round icon="mdi-arrow-left" class="q-mr-sm"
               @click="closeDialog()"
        >
          <q-tooltip>
            Close
          </q-tooltip>
        </q-btn>
        <span style="font-size: 19px">Select Armor</span>
      </q-toolbar>

      <q-card-section>
        <q-input v-model="searchInput" label="Search">
          <template v-slot:prepend>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </q-card-section>

      <q-table
        class="sticky-header-table"
        row-key="id"
        :data="table.data"
        :columns="table.columns"
        :pagination.sync="table.pagination"
        :rows-per-page-options="[0]"
        :filter="searchInput"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props.row)">
            <q-td key="name" :props="props">
              <!-- <q-avatar size="35px" class="q-mr-xs">
                <q-img contain loading="lazy" :src="props.row.image" @error="$event.target.src=`${props.row.backupImage}`" />
              </q-avatar> -->
              {{ props.row.shortName }}
            </q-td>

            <q-td key="class" :props="props">
              {{ props.row.class }}
            </q-td>

            <q-td key="maxDurability" :props="props">
              {{ props.row.maxDurability }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from '@vue/composition-api'
import { Armor } from 'src/models/items/Armor'
import { ArmorRow } from 'src/components/_models/ArmorRow'

export default defineComponent({
  name: 'ArmorListDialog',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    armors: {
      type: Array as PropType<Armor[]>,
      required: true
    }
  },
  setup (props, { emit }) {
    const closeDialog = () => {
      emit('closeDialog')
    }

    const searchInput = ref('')

    function onRowClick (row: ArmorRow) {
      emit('selectRow', row)
      emit('closeDialog')
    }

    function createRows (armors: Armor[]): ArmorRow[] {
      const rows: ArmorRow[] = []
      for (const armor of armors) {
        const row = new ArmorRow(
          armor.id,
          armor.shortName,
          armor.armor.class,
          armor.armor.durability,
          armor.blightbusterIcon,
          armor.icon)
        rows.push(row)
      }
      return rows
    }

    const rows = computed(() => {
      return createRows(props.armors)
    })

    const table = {
      data: rows,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          field: 'shortName',
          align: 'left',
          sortable: true
        },
        {
          name: 'class',
          required: true,
          label: 'Class',
          field: 'class',
          align: 'center',
          sortable: true
        },
        {
          name: 'maxDurability',
          required: true,
          label: 'Max Durability',
          field: 'maxDurability',
          align: 'center',
          sortable: true
        }
      ],
      pagination: {
        rowsPerPage: 0,
        sortBy: 'class',
        descending: true
      }
    }

    return { props, closeDialog, searchInput, table, onRowClick }
  }
})
</script>

<style lang="scss">
  .sticky-header-table {
    /* height or max-height is important */
    max-height: 80%;
  }

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: $dark
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }
</style>
