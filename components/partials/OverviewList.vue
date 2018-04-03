<template>
  <div class="list-container" style="height: calc(100% - 98px)">

      <list-row 
        v-for="(entry, idx) in dirItems" 
        :key="idx"
        :name="entry.name"
        :type="entry.type"
        :size="entry.size"
        :date="entry.date"></list-row>

      <div class="list-summary menu-list-height">
        <div style="width: 100px" class="list-item"></div>
        <div style="width: calc(100% - 535px)" class="list-item">
            <span>{{followingDirectorys}} Ordner, {{followingFilesDisplay}}</span>
        </div>
        <div style="width: 185px" class="list-item"></div>
        <div style="width: 100px" class="list-item">
            <span>{{sizeSum | toUnit}}</span>
        </div>
        <div style="width: 150px" class="list-item"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListRow from '~/components/UI/ListRow'

export default {
  data() {
    return {}
  },
  components: {
    ListRow
  },
  computed: {
    ...mapGetters([
      'dirItems',
      'followingDirectorys',
      'followingFiles',
      'sizeSum'
    ]),
    followingFilesDisplay() {
      return `${this.followingFiles} ${
        this.followingFiles > 1 || this.followingFiles == 0
          ? 'Dateien'
          : 'Datei'
      }`
    }
  }
}
</script>
