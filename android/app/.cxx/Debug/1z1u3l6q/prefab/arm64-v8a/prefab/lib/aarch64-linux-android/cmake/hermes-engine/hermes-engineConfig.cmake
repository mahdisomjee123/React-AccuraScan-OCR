if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/accura/.gradle/caches/8.11.1/transforms/3095dc6b77e763e1a39d92c720b9d4ee/transformed/jetified-hermes-android-0.76.9-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/accura/.gradle/caches/8.11.1/transforms/3095dc6b77e763e1a39d92c720b9d4ee/transformed/jetified-hermes-android-0.76.9-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

