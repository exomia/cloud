<template>
    <div class="upload-overlay">

        <div class="upload-info">
            <img src="~/assets/img/icon/upload-info.svg" alt="Upload" class="upload-img">
            <span class="upload-text">Legen Sie die Dateien irgendwo im markierten Bereich ab.</span>
        </div>

        <!-- <div class="upload-container" style="display: none"> -->

            <div style="height: 20%;flex-direction: column">

                <div class="top">

                    <h2>Wählen Sie Dateien zum hochladen aus</h2>

                    <a class="close-button" onclick="toggleOverlay(false)">
                        <i class="close-icon"></i>
                    </a>

                </div>

                <div class="list-header">
                    <div style="width: 50%" class="head-item">
                        <span>Name</span>
                    </div>
                    <div style="width: 25%" class="head-item">
                        <span>Größe</span>
                    </div>
                    <div style="width: 25%" class="head-item">
                        <span>Entfernen?</span>
                    </div>
                </div>

            </div>

            <!-- List Template -->
            <div id="upload-list-row-template" class="list-row upload-row"
                style="display: none;height:35px">
                <div class="file-progress"></div>
                <div style="width: 50%" class="list-item">
                    <span>{0}</span>
                </div>
                <div style="width: 25%" class="list-item">
                    <span>{1}</span>
                </div>
                <div style="width: 25%" class="list-item">
                    <a class="list-button" {2}>
                        <i class="remove-icon"></i>
                    </a>
                </div>
            </div>

            <!-- Empty list -->
            <div class="list-container" style="height: 65%">

            </div>

            <div style="height: 15%">

                <div class="button-container">

                    <div class="upload-file-button">
                        <i class="file-icon"></i>
                        <span>Add files</span>
                        <input class="file-input" type="file" multiple>
                    </div>

                <!--<div class="upload-button">
                    <i class="folder-icon"></i>
                    <span>Add folder</span>
                    <input class="folder-input" type="file" webkitdirectory directory>
                </div>-->

                </div>

                <div class="action-container">

                    <!-- 1 Datei, 300 MB -->
                    <span class="summary-text"></span>

                    <a class="cancel-button" onclick="toggleOverlay(false); abortUpload()">
                        <span>Abbrechen</span>
                    </a>

                    <a class="upload-button" onclick="startUpload('{{directory_id}}')">
                        <span>Hochladen</span>
                    </a>

                </div>

            </div>

    </div>

</template>

<script>
export default {}
</script>
