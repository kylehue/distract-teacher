<template>
  <div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32px;
      "
    >
      <h1 style="font-size: 32px; font-weight: bold">Evidence</h1>
      <n-button type="primary" @click="showUploadModal = true">
        + Upload Evidence
      </n-button>
    </div>

    <!-- Evidence Grid -->
    <div
      v-if="evidenceItems.length === 0"
      style="text-align: center; padding: 32px 0; color: #999"
    >
      No evidence items uploaded yet.
    </div>

    <n-grid v-else :cols="3" :x-gap="24" :y-gap="24" responsive="screen">
      <n-gi v-for="item in evidenceItems" :key="item.id" span="3 m:2 s:1">
        <n-card>
          <!-- Preview -->
          <div
            style="
              width: 100%;
              height: 180px;
              background: rgba(255, 255, 255, 0.05);
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
              margin-bottom: 16px;
            "
          >
            <div style="text-align: center; color: #999">
              <div style="font-size: 40px; margin-bottom: 8px">
                {{ getFileIcon(item.type) }}
              </div>
              <p style="font-size: 12px; text-transform: uppercase">
                {{ item.type }}
              </p>
            </div>
          </div>

          <!-- Details -->
          <p
            style="
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            {{ item.filename }}
          </p>
          <p style="font-size: 14px; color: #999; margin: 4px 0">
            {{ item.size }}
          </p>
          <p style="font-size: 14px; color: #999; margin-bottom: 12px">
            {{ item.date }}
          </p>

          <div
            v-if="item.description"
            style="
              font-size: 14px;
              color: #ccc;
              margin-bottom: 12px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              line-clamp: 2;
            "
          >
            {{ item.description }}
          </div>

          <div style="display: flex; gap: 8px">
            <n-button type="primary" block @click="viewEvidence(item)"
              >View</n-button
            >
            <n-button type="error" @click="deleteEvidence(item.id)"
              >Delete</n-button
            >
          </div>
        </n-card>
      </n-gi>
    </n-grid>

    <!-- Upload Modal -->
    <n-modal
      :show="showUploadModal"
      preset="dialog"
      title="Upload Evidence"
      positive-text="Upload"
      negative-text="Cancel"
      @update:show="showUploadModal = $event"
      @positive="uploadEvidence"
    >
      <n-form-item label="File Name">
        <n-input
          v-model="newEvidence.filename"
          type="text"
          placeholder="e.g., classroom_behavior.jpg"
        />
      </n-form-item>

      <n-form-item label="File Type">
        <n-select
          v-model="newEvidence.type"
          :options="typeOptions"
          placeholder="Select file type"
        />
      </n-form-item>

      <n-form-item label="Description">
        <n-input
          v-model="newEvidence.description"
          type="textarea"
          placeholder="Describe the evidence..."
        />
      </n-form-item>

      <n-form-item label="File Size">
        <n-input
          v-model="newEvidence.size"
          type="text"
          placeholder="e.g., 2.5 MB"
        />
      </n-form-item>
    </n-modal>

    <!-- View Evidence Modal -->
    <n-modal
      :show="showViewEvidenceModal"
      preset="dialog"
      title="Evidence Details"
      positive-text="Close"
      @update:show="showViewEvidenceModal = $event"
    >
      <div v-if="selectedEvidence">
        <div
          style="
            width: 100%;
            height: 300px;
            background: rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            margin-bottom: 16px;
          "
        >
          <div style="text-align: center; color: #999">
            <div style="font-size: 60px; margin-bottom: 16px">
              {{ getFileIcon(selectedEvidence.type) }}
            </div>
            <p style="font-size: 14px; text-transform: uppercase">
              {{ selectedEvidence.type.toUpperCase() }} FILE
            </p>
          </div>
        </div>

        <div style="margin-bottom: 16px">
          <p style="color: #999; font-size: 14px">File Name</p>
          <p style="font-weight: 500">{{ selectedEvidence.filename }}</p>
        </div>

        <div style="margin-bottom: 16px">
          <p style="color: #999; font-size: 14px">File Type</p>
          <p style="font-weight: 500; text-transform: capitalize">
            {{ selectedEvidence.type }}
          </p>
        </div>

        <div style="margin-bottom: 16px">
          <p style="color: #999; font-size: 14px">File Size</p>
          <p style="font-weight: 500">{{ selectedEvidence.size }}</p>
        </div>

        <div style="margin-bottom: 16px">
          <p style="color: #999; font-size: 14px">Upload Date</p>
          <p style="font-weight: 500">{{ selectedEvidence.date }}</p>
        </div>

        <div v-if="selectedEvidence.description">
          <p style="color: #999; font-size: 14px">Description</p>
          <p style="font-weight: 500">{{ selectedEvidence.description }}</p>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  NCard,
  NGrid,
  NGi,
  NButton,
  NModal,
  NFormItem,
  NInput,
  NSelect,
} from "naive-ui";

const evidenceItems = ref<any[]>([]);
const selectedEvidence = ref<any>(null);
const showUploadModal = ref(false);
const showViewEvidenceModal = ref(false);
const newEvidence = ref({
  filename: "",
  type: "image",
  description: "",
  size: "",
});

const typeOptions = [
  { label: "Image", value: "image" },
  { label: "Video", value: "video" },
  { label: "Document", value: "document" },
  { label: "Audio", value: "audio" },
];

onMounted(() => {
  loadEvidence();
});

const loadEvidence = () => {
  evidenceItems.value = JSON.parse(localStorage.getItem("evidence") || "[]");
};

const getFileIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    image: "🖼️",
    video: "🎥",
    document: "📄",
    audio: "🎵",
  };
  return icons[type] || "📁";
};

const uploadEvidence = () => {
  if (!newEvidence.value.filename || !newEvidence.value.size) {
    alert("Please fill in all required fields");
    return;
  }

  const evidence = {
    id: Date.now().toString(),
    filename: newEvidence.value.filename,
    type: newEvidence.value.type,
    description: newEvidence.value.description,
    size: newEvidence.value.size,
    date: new Date().toLocaleDateString(),
  };

  evidenceItems.value.push(evidence);
  localStorage.setItem("evidence", JSON.stringify(evidenceItems.value));

  newEvidence.value = {
    filename: "",
    type: "image",
    description: "",
    size: "",
  };
  showUploadModal.value = false;
  alert("Evidence uploaded successfully!");
};

const viewEvidence = (item: any) => {
  selectedEvidence.value = item;
  showViewEvidenceModal.value = true;
};

const deleteEvidence = (id: string) => {
  if (confirm("Delete this evidence?")) {
    evidenceItems.value = evidenceItems.value.filter((e) => e.id !== id);
    localStorage.setItem("evidence", JSON.stringify(evidenceItems.value));
    loadEvidence();
  }
};
</script>
